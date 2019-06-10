<script>
  export let projects, title;

  // because of how we had to structure the archie document
  projects.forEach(d => {
    d.delivered = d.delivered[0];
    d.delivered.title = "Delivered";
    d.promised = d.promised[0];
    d.promised.title = "Promised";
  });
</script>

<style>
  h2 {
    text-align: center;
  }
</style>

<div class="projects-container">
  <h2>{title}</h2>

  {#each projects as { description, promised, delivered }}
    <h3>{description}</h3>

    {#each [promised, delivered] as { title, cost, date, description }}
      <h4>{title}</h4>
      <p>Cost: {cost}</p>
      <p>Date: {date}</p>
      <p>Description: {description}</p>
    {/each}
  {/each}
</div>
