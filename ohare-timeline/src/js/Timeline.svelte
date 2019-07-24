<script>
  // https://svelte.dev/docs#svelte_store
  import { slide } from "./stores";

  let currentSlide;

  const unsubscribe = slide.subscribe(value => {
    currentSlide = value;
  });

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
    const textBlocks = document.querySelectorAll(
      ".tl-event-container .tl-text-contents"
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.2) {
            // remove active class from current slide
            currentSlide && currentSlide.classList.remove("is-active");

            // add is-active to current timeline item
            entry.target
              .closest(".tl-event-container")
              .classList.add("is-active");

            // set current timeline item as current slide in store
            slide.set(entry.target.closest(".tl-event-container"));
          }
        });
      },
      {
        threshold: 0.2
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
            document
              .querySelectorAll(".tl-event-container")
              .forEach(c => c.classList.remove("is-active"));
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

  export let events = [];

  import { onMount, onDestroy } from "svelte";

  import Button from "./components/controls/Button";
  import TimelineEvents from "./components/events";

  let scrollOptionsBlock;

  $: prevEl = currentSlide && currentSlide.previousElementSibling;
  $: nextEl = currentSlide && currentSlide.nextElementSibling;
  // $: scrollBlock = currentSlie

  function calcScrollBlock(el) {
    return el.getBoundingClientRect().height <= window.innerHeight
      ? "center"
      : "start";
  }

  let scrollOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  };

  const scrollToTop = function() {
    document.querySelector("section.intro").scrollIntoView(scrollOptions);
  };

  const onClickPrev = function() {
    if (prevEl) {
      scrollOptions.block = calcScrollBlock(
        prevEl.querySelector(".tl-text-contents")
      );
      prevEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
    }
  };

  const onClickNext = function() {
    if (nextEl) {
      scrollOptions.block = calcScrollBlock(
        nextEl.querySelector(".tl-text-contents")
      );
      nextEl.querySelector(".tl-text").scrollIntoView(scrollOptions);
    }
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
    top: calc(100vh - 2.5rem - 2rem);
    height: 4.5rem;
    text-align: right;
    z-index: 99;
    margin-left: 1rem;
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
  <TimelineEvents {events} />
</div>
