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
  export let projects, title;

  // because of how we had to structure the archie document
  projects.forEach(d => {
    d.delivered = d.delivered[0];
    d.delivered.title = "Delivered";
    d.promised = d.promised[0];
    d.promised.title = "Promised";
  });

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
  h2 {
    text-align: center;
  }

  h3[data-year] {
    position: relative;
  }

  h3[data-year]::before {
    content: attr(data-year);
    color: slategray;
    display: block;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1160px) {
    h3[data-year]::before {
      margin-right: 1rem;
      position: absolute;
      right: 100%;
    }
  }

  table {
    table-layout: fixed;
    width: 100%;
  }

  table td:first-child,
  table th:first-child {
    width: 11.05ch; /* width of "Description" */
  }

  table td,
  table th {
    padding: 0.5rem;
    hyphens: auto;
  }

  .project-individual {
    margin-bottom: 3rem;
  }

  .project-heading {
    display: flex;
    /* align-items: stretch; */
    justify-content: flex-start;
  }

  .project-heading > :global(span) {
    margin-left: auto;
  }

  :global(.red) {
    color: crimson;
  }
</style>

<div class="projects-container">
  <h2 class="project-heading">
    {@html headingHTML}
  </h2>

  {#each projects as { date, description, promised, delivered }}
    <div class="project-individual">
      <h3 data-year={date}>{description}</h3>

      <table lang="en-us">
        <thead>
          <th />
          <th>{promised.title}</th>
          <th>{delivered.title}</th>
        </thead>
        <tr>
          <td>Date</td>
          <td>{promised.date}</td>
          <td>{delivered.date}</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>{promised.cost}</td>
          <td>{delivered.cost}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{promised.description}</td>
          <td>{delivered.description}</td>
        </tr>
      </table>

    </div>
  {/each}
</div>
