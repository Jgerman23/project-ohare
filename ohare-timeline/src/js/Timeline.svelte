<script>
  import md from "marked";
  import { groupBy } from "./utils";

  let visible = true;
  let currentDate;

  export let events = [];

  $: groupedEvents = groupBy("Date")(events);
</script>

<style>
  .card {
    padding: 1rem 1rem 1.5rem;
  }

  .tag {
    background: gray;
    color: white;
    padding: 0.3rem 0.25rem 0.2rem;
    text-transform: uppercase;
  }

  :global(p:last-of-type) {
    margin-bottom: 0;
  }
</style>

<div class="timeline">
  {#each Object.entries(groupedEvents) as [date, events] (date)}
    <h3 class="date-heading">{date}</h3>
    {#each events as event (event)}
      <div class="card event">
        {@html md(event.Description)}
        {#if event.tags && event.tags.length > 0}
          <p class="tags">
            {#each event.tags as tag}
              <span class="tag">{tag.value}</span>
            {/each}
          </p>
        {/if}
      </div>
    {/each}
  {/each}
</div>
