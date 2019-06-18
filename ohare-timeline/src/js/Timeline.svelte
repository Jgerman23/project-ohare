<script>
  import TimelineEvents from "./TimelineEvents.svelte";

  export let content = [];
</script>

<style>
  .timeline-heading {
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  :global(p:last-of-type) {
    margin-bottom: 0;
  }
</style>

<div class="timeline">
  {#each content as contentItem}
    {#if contentItem.type == 'Heading'}
      <h2 class="timeline-heading">
        <i class="fas fa-plane" />
         {contentItem.value}
      </h2>
    {/if}

    {#if contentItem.type == 'events'}
      <TimelineEvents events={contentItem.value} />
    {/if}
  {/each}
</div>
