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
  };

  window.addEventListener("load", onLoad);
</script>

<script>
  export let content = [];

  import Button from "./components/controls/Button";
  import Switch from "./components/controls/Switch";
  import TimelineEvents from "./components/events";

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
  :global(.timeline.is-scrolly) {
    .tl-event-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: auto;
      min-height: 100vh;

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

  .controls {
    position: fixed;
    bottom: 1rem;
    // left: 0;
    right: 1rem;
    text-align: right;
    z-index: 99;
  }
</style>

{#if showScrolly}
  <div class="controls">
    <Button on:click={onClickPrev} disabled={currentIndex <= 0}>
      <i class="fas fa-chevron-up" />
    </Button>
    <Button
      on:click={onClickNext}
      disabled={currentIndex == allContainers.length - 1}>
      Next
      <i class="fas fa-chevron-down" />
    </Button>
  </div>
{/if}

<!-- <p>
  Show rich media:
  <Switch bind:checked={showScrolly} />
</p> -->

<div class="timeline" class:is-scrolly={showScrolly} id="timeline-inner">
  {#each content as contentItem}
    {#if contentItem.type == 'events'}
      <TimelineEvents events={contentItem.value} />
    {/if}
  {/each}
</div>
