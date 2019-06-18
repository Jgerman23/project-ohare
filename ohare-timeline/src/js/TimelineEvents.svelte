<script>
  import md from "marked";

  export let events;
</script>

<style>
  .date-heading {
    line-height: 1;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-family: acumin-pro, sans-serif;
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

  .timeline-events {
    --timeline-color: ivory;
    --timeline-margin: 5px;
    position: relative;
    padding-left: 1.5rem;
  }

  .timeline-events::before {
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

  .tl-event-container {
    padding-bottom: 3rem;
    padding-top: 2rem;
  }

  /* other */

  .tag {
    color: white;
    font-size: 0.9rem;
    padding: 0.3rem 0.25rem 0.2rem;
    margin-right: 0.5rem;
    text-transform: uppercase;
  }
</style>

<div class="timeline-events">
  {#each events as event (event)}
    <div class="tl-event-container">
      <h3 class="date-heading">{event.Date}</h3>
      <div class="tl-event">
        {@html md(event.Description)}
        {#if event.tags && event.tags.length > 0}
          <p class="tags">
            {#each event.tags as tag}
              <span class="tag">{tag.value}</span>
            {/each}
          </p>
        {/if}
      </div>
    </div>
  {/each}
</div>
