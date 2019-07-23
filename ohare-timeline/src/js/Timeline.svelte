<script context="module">
  // https://svelte.dev/docs#svelte_store
  import { slide } from "./stores";

  // load polyfill
  import "intersection-observer";

  /**
   * Set up IntersectionObserver.
   *
   * We'll use the intersections of timeline text blocks to detect what our
   * active slide is.
   *
   * - API docs: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   *
   **/
  function createObserver() {
    const allItems = document.querySelectorAll(".tl-event-container");

    const textBlocks = document.querySelectorAll(
      ".tl-event-container .tl-text"
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // remove active class from all timelime items
            allItems.forEach(c => c.classList.remove("is-active"));

            // add is-active to current timeline item
            entry.target.parentNode.classList.add("is-active");

            // set current timeline item as current slide in store
            slide.set(entry.target.parentNode);
          }
        });
      },
      {
        threshold: 0.75
      }
    );

    // manage global display based on intersection of first timeline item
    // wasAbove / isAbove ripped from https://stackoverflow.com/a/47117560
    let wasAbove;

    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const isAbove = entry.boundingClientRect.y < entry.rootBounds.y;

          if (entry.isIntersecting) {
            slide.set(entry.target.parentNode);
          } else if (!wasAbove) {
            // if scrolling up, hide everything
            allItems.forEach(c => c.classList.remove("is-active"));
            slide.set(null);
          }

          wasAbove = isAbove;
        });
      },
      { threshold: [0, 1.0] }
    ).observe(
      document.querySelector(".tl-event-container:first-of-type .tl-text")
    );

    textBlocks.forEach(e => {
      observer.observe(e);
    });
  }
</script>

<script>
  export let content = [];

  import { onMount, onDestroy } from "svelte";

  import Button from "./components/controls/Button";
  import TimelineEvents from "./components/events";

  let currentSlide;

  const unsubscribe = slide.subscribe(value => {
    currentSlide = value;
  });

  $: prevEl = currentSlide && currentSlide.previousElementSibling;
  $: nextEl = currentSlide && currentSlide.nextElementSibling;

  const scrollOptions = {
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  };

  const scrollToTop = function() {
    document.querySelector("section.intro").scrollIntoView(scrollOptions);
  };

  const onClickPrev = function() {
    if (prevEl) prevEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
  };

  const onClickNext = function() {
    if (nextEl) nextEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
  };

  $: {
    if (currentSlide) {
      const hash = currentSlide.id;

      // remove hash from slide to prevent scrolling
      currentSlide.id = null;

      // set url hash
      window.history.replaceState(null, null, `#${hash}`);
      // window.location.hash = `#${hash}`;

      // add hash back to slide
      currentSlide.id = hash;
    } else {
      window.history.replaceState(null, null, `#`);
    }
  }

  onMount(createObserver);
  onDestroy(unsubscribe);
</script>

<style>
  .controls {
    position: sticky;
    top: calc(100vh - 2.5rem - 1.5rem);
    height: 2.5rem;
    text-align: right;
    z-index: 99;
  }
</style>

<div class="controls">
  <Button on:click={scrollToTop} disabled={!prevEl}>Top</Button>
  <Button on:click={onClickPrev} disabled={!prevEl}>
    <i class="fas fa-chevron-up" />
  </Button>
  <Button on:click={onClickNext} disabled={!nextEl}>
    Next
    <i class="fas fa-chevron-down" />
  </Button>
</div>

<div class="timeline" id="timeline-inner">
  {#each content as contentItem}
    {#if contentItem.type == 'events'}
      <TimelineEvents events={contentItem.value} />
    {/if}
  {/each}
</div>
