<script>
  import md from "marked";
  import { groupBy } from "./utils";

  export let content = [];
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

  .timeline-section {
    --timeline-color: #1a1a1a;
    --timeline-margin: 5px;
    position: relative;
    padding-left: 1.5rem;
  }

  .timeline-section::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--timeline-color);
    width: 2px;
    left: 0;
    left: var(--timeline-margin);
  }

  .timeline-section-heading {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .date-heading {
    line-height: 1;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }

  .date-heading:first-of-type {
    margin-top: 0;
  }

  .date-heading::before {
    content: "";
    display: inline-block;
    background: var(--timeline-color);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: calc(var(--timeline-margin) - 4px);
  }

  :global(p:last-of-type) {
    margin-bottom: 0;
  }
</style>

<div class="timeline">
  {#each content as contentItem}
    {#if contentItem.type == 'Heading'}
      <h2 class="timeline-section-heading">{contentItem.value}</h2>
    {/if}

    {#if contentItem.type == 'events'}
      <div class="timeline-section">
        {#each Object.entries(groupBy('Date')(contentItem.value)) as [date, events] (date)}
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
    {/if}
  {/each}
</div>
