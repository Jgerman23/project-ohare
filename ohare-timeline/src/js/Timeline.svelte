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
          } else {
            entry.target.parentNode.classList.remove("is-active");
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

  const scrollOptions = {
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  };

  const scrollToTop = function() {
    document.querySelector("section.intro").scrollIntoView(scrollOptions);
  };

  $: onClickPrev = function() {
    if (prevEl) prevEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
  };

  $: onClickNext = function() {
    if (nextEl) nextEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
  };

  onMount(createObserver);
  onDestroy(unsubscribe);
</script>

<style>
  .controls {
    position: sticky;
    top: calc(100vh - 2.5rem - 1rem);
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
