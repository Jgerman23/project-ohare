<script>
  import Heading from "./Heading.svelte";

  export let projects, title;

  // because of how we had to structure the archie document
  projects.forEach(d => {
    d.delivered = d.delivered[0];
    d.delivered.title =
      d.delivered.title !== undefined ? d.delivered.title : "Delivered";
    d.promised = d.promised[0];
    d.promised.title =
      d.promised.title !== undefined ? d.promised.title : "Promised";
  });
</script>

<style lang="scss">
  h3[data-year] {
    position: relative;
  }

  h3[data-year]::before {
    content: attr(data-year);
    color: ivory;
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

  td:first-child,
  th:first-child {
    width: 11.25ch; /* width of "Completion" */
    text-align: left !important;
  }

  td,
  th {
    padding: 0.5rem;
    hyphens: auto;
  }

  .project-individual {
    margin-bottom: 3rem;
  }

  thead th,
  tr[data-name="date"] td,
  tr[data-name="cost"] td {
    text-align: center;
  }
</style>

<div class="projects-container">
  <Heading {title} />

  {#each projects as { date, description, promised, delivered }}
    <div class="project-individual">
      <h3 data-year={date} class="date-heading">{description}</h3>

      <table lang="en-us">
        <thead>
          <th />
          <th>
            {@html promised.title}
          </th>
          <th>
            {@html delivered.title}
          </th>
        </thead>
        <tr data-name="date">
          <td>Completion</td>
          <td data-title={promised.title}>
            {@html promised.date}
          </td>
          <td data-title={delivered.title}>
            {@html delivered.date}
          </td>
        </tr>
        <tr data-name="cost">
          <td>Cost</td>
          <td data-title={promised.title}>
            {@html promised.cost}
          </td>
          <td data-title={delivered.title}>
            {@html delivered.cost}
          </td>
        </tr>
        <tr data-name="description">
          <td>Description</td>
          <td data-title={promised.title}>
            {@html promised.description}
          </td>
          <td data-title={delivered.title}>
            {@html delivered.description}
          </td>
        </tr>
      </table>

    </div>
  {/each}
</div>
