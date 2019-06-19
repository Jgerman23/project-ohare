<script context="module">
  import { slide } from "./stores";

  let allContainers = [];

  let showScrolly = true;

  const onLoad = () => {
    allContainers = document.querySelectorAll(".tl-event-container");

    const eventItems = document.querySelectorAll(
      ".tl-event-container .tl-text"
    );

    const eventItemObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // lazyload image
          const image = entry.target.parentNode.querySelector("img[data-src]");
          if (showScrolly && image) image.src = image.dataset.src;

          entry.target.parentNode.classList.add("is-active");
          slide.set(entry.target.parentNode);
        } else {
          entry.target.parentNode.classList.remove("is-active");
        }
      });
    });

    eventItems.forEach(ei => {
      eventItemObserver.observe(ei);
    });

    const headings = document.querySelectorAll(".timeline-heading");

    const headingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector(".timeline").classList.add("hide-all-images");
          // slide.set(entry.target);
        } else {
          document
            .querySelector(".timeline")
            .classList.remove("hide-all-images");
        }
      });
    });

    headings.forEach(h => {
      headingObserver.observe(h);
    });
  };

  window.addEventListener("load", onLoad);
</script>

<script>
  let currentSlide, currentIndex;

  const unsubscribe = slide.subscribe(value => {
    currentSlide = value;
    currentIndex = Array.prototype.indexOf.call(
      document.querySelectorAll(".tl-event-container"),
      currentSlide
    );
  });

  import { onDestroy } from "svelte";

  onDestroy(unsubscribe);

  import TimelineEvents from "./TimelineEvents.svelte";
  export let content = [];

  const onClickPrev = () => {
    const prevEl = allContainers.item(currentIndex - 1);

    if (prevEl)
      prevEl.querySelector(".tl-text").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
  };

  const onClickNext = () => {
    const nextEl = allContainers.item(currentIndex + 1);

    if (nextEl)
      nextEl.querySelector(".tl-text").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
  };
</script>

<style lang="scss">
  .timeline-heading {
    padding-top: 4rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  :global(p:last-of-type) {
    margin-bottom: 0;
  }

  :global(.timeline.is-scrolly) {
    .tl-event-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      overflow: hidden;
      height: auto;
      min-height: 100vh;

      &:first-of-type .tl-text {
        margin-top: 3rem !important;
      }

      .tl-text {
        margin-top: 90vh;
      }

      .image-container {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &.is-active .image-container {
        opacity: 1;
      }

      &.is-active figure {
        pointer-events: all;
      }
    }
  }

  :global(.image-container) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    pointer-events: none;

    display: flex;
    align-items: center;
  }

  .controls {
    position: fixed;
    bottom: 1rem;
    // left: 0;
    right: 1rem;
    text-align: right;
    z-index: 99;
  }

  button {
    background: none;
    color: ivory;
    text-transform: uppercase;
    border: 2px solid currentColor;
    font-size: 1rem;
    margin: 0 0.5rem;
    transition: background 0.3s ease, opacity 0.3s ease;
    padding: 0.5rem;
  }

  button:hover,
  button:focus {
    background: rgba(255, 255, 255, 0.4);
  }

  button[disabled] {
    pointer-events: none;
    opacity: 0;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

<div class="controls">
  <button on:click={onClickPrev} disabled={currentIndex <= 0}>
    <i class="fas fa-chevron-up" />
  </button>
  <button
    on:click={onClickNext}
    disabled={currentIndex == allContainers.length - 1}>
    Next
    <i class="fas fa-chevron-down" />
  </button>
</div>

<!-- <label class="switch">
  <input type="checkbox" bind:checked={showScrolly} />
  <span class="slider round" />
</label> -->

<div class="timeline" class:is-scrolly={showScrolly} id="timeline-inner">
  {#each content as contentItem}
    {#if contentItem.type == 'Heading'}
      <h2 class="timeline-heading">
        <i class="fas fa-plane" />
         {contentItem.value}
      </h2>
    {/if}

    {#if contentItem.type == 'events'}
      <TimelineEvents events={contentItem.value} />
    {/if}
  {/each}
</div>
