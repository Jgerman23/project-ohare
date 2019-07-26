<script>
  /* init terminal styling */
  import { onMount } from "svelte";
  import TerminalHeading from "ohare-investigation/src/js/heading-terminal";

  let headingEl;

  onMount(() => {
    const heading = new TerminalHeading(headingEl, false);
  });

  /* set up html */
  export let title;

  const delayedHTML = `<div class="red">${"Delayed".replace(
    /./g,
    "<b>$&</b>"
  )}</div>`;

  const projectHTML =
    "<div>" +
    title
      .replace(/\S/g, "<b>$&</b>")
      .replace(
        /\s/g,
        `</div><div class="space"><b>${String.fromCharCode(160)}</b></div><div>`
      ) +
    "</div>";
</script>

<style lang="scss">
  :global(.project-heading) {
    --c-width: 25px;
    --c-spacing: 5px;
    --c-background: #{transparentize(gray, 0.8)};

    font-family: led-calculator;
    font-weight: 100;
    text-transform: uppercase;

    display: flex;
    justify-content: flex-start;
    text-align: center;
    flex-wrap: wrap;

    .spacer {
      flex-grow: 1;
      min-width: calc(var(--c-width) + var(--c-spacing));

      background: repeating-linear-gradient(
        to right,
        var(--c-background),
        var(--c-background) var(--c-width),
        transparent var(--c-width),
        transparent calc(var(--c-width) + var(--c-spacing))
      );
    }

    > div {
      display: flex;
      margin-bottom: var(--c-spacing);
    }

    > div > b {
      background: var(--c-background);
      font-size: var(--c-width);
      font-weight: 100;
      line-height: 1.4;
      margin-right: var(--c-spacing);
      width: var(--c-width);
    }
  }

  .project-heading > :global(span) {
    margin-left: auto;
  }

  :global(.red) {
    color: crimson;
  }
</style>

<h2 class="project-heading" bind:this={headingEl}>
  {@html projectHTML}
  <div class="spacer" />
  {@html delayedHTML}
</h2>
