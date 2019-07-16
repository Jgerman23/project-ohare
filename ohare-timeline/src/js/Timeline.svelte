<script context="module">
  // https://svelte.dev/docs#svelte_store
  import { slide } from "./stores";

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
      { threshold: 0.75 }
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

  $: onClickPrev = function() {
    if (prevEl)
      prevEl.querySelector(".tl-text").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
  };

  $: onClickNext = function() {
    if (nextEl)
      nextEl.querySelector(".tl-text").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
  };

  onMount(createObserver);
  onDestroy(unsubscribe);
</script>

<style>
  .controls {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    text-align: right;
    z-index: 99;
  }
</style>

<div class="controls">
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
