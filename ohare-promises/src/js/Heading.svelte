<script context="module">
  import debounce from "debounce";

  const onResize = function() {
    const headings = document.querySelectorAll(".project-heading");
    const parentWidth = headings[0].parentNode.getBoundingClientRect().width;

    const newWidth = Math.floor(parentWidth / 30) * 30;

    headings.forEach(heading => {
      heading.style.width = newWidth + "px";

      const spaces = heading.querySelectorAll("div.space, div.spacer");

      spaces.forEach(spaceEl => {
        if (
          spaceEl.getBoundingClientRect().top !==
          spaceEl.nextElementSibling.getBoundingClientRect().top
        ) {
          spaceEl.classList.add("invisible");
        } else {
          spaceEl.classList.remove("invisible");
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("resize", debounce(onResize, 200));
    setTimeout(onResize, 500);
  });
</script>

<script>
  export let title;

  $: {
    console.log(title);
  }

  const delayedHTML = `${"Delayed".replace(/./g, "<b>$&</b>")}`;

  const projectHTML = title
    .replace(/\S/g, "<b>$&</b>")
    .replace(
      /\s/g,
      `</div><div><b class="space">${String.fromCharCode(160)}</b></div><div>`
    );

  const headingHTML = `
  <div>${projectHTML}</div>
  <div class='spacer'></div>
  <div class="red">${delayedHTML}</div>
  `;
</script>

<style>
  .project-heading {
    display: flex;
    /* align-items: stretch; */
    justify-content: flex-start;
    text-align: center;
  }

  .project-heading > :global(span) {
    margin-left: auto;
  }

  :global(.red) {
    color: crimson;
  }
</style>

<h2 class="project-heading">
  {@html headingHTML}
</h2>
