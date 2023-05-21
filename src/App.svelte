<script>
  import ProjectsTab from './lib/ProjectsTab.svelte'
  import ProjectSummaryTab from './lib/ProjectSummaryTab.svelte'
	import { onMount } from 'svelte';

  import {initProjectsDB, saveProject, getProject, listProjects} from './lib/js-utilities/db-utilities';

  let tabBtns = {}
  let currentTabIndex = 0;
  onMount(async () => {
    await initProjectsDB();
    await saveProject({name: 'project1', id: '1.a'});
    console.log(await getProject('1.a'));
    console.log(await listProjects());
    // tabBtns.projects.style.color = 'var(--button-text)';
	});

  /**
     * @param {string} tab
  */
  function showTab(tab) {
    greyTabBtns();
    tabBtns[tab].style.color = 'var(--highlight-text)';
    tabBtns[tab].style.backgroundColor = 'var(--highlight)';
    currentTabIndex = Object.keys(tabBtns).indexOf(tab);
  }

  function greyTabBtns() {
    for (const key in tabBtns) {
      tabBtns[key].style.color = 'var(--gray-text)';
      tabBtns[key].style.backgroundColor = 'var(--canvas)';
    }
  }

</script>

<main>
  <nav>
    <button bind:this={tabBtns.projects} on:click={() => {showTab('projects')}} class="start-color">Projects</button>
    <div class="flex-spacer"></div>
    <button bind:this={tabBtns.projectSummary} on:click={() => {showTab('projectSummary')}}>Project Summary</button>
    <button bind:this={tabBtns.designer} on:click={() => {showTab('designer')}}>Designer</button>
    <button bind:this={tabBtns.additionalItems} on:click={() => {showTab('additionalItems')}}>Additional Items</button>
    <button bind:this={tabBtns.cutlist} on:click={() => {showTab('cutlist')}}>Cutlist</button>
    <button bind:this={tabBtns.doorList} on:click={() => {showTab('doorList')}}>Door List</button>
    <button bind:this={tabBtns.estimate} on:click={() => {showTab('estimate')}}>Estimate Breakdown</button>
    <button bind:this={tabBtns.invoice} on:click={() => {showTab('invoice')}}>Invoice</button>
    <div class="flex-spacer"></div>
    <button bind:this={tabBtns.settings} on:click={() => {showTab('settings')}}>Settings</button>
  </nav>
  <section>
    {#if currentTabIndex == 0}
      <ProjectsTab/>
    {:else if currentTabIndex == 1}
      <ProjectSummaryTab/>
    {/if}
  </section>
  <footer>Status</footer>
</main>

<style>
  main{
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  nav{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    border-bottom: 1px solid var(--button-border);
  }
  nav button{
    font-size: 1rem;
    margin: 0.1rem 0;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--button-border);
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: 0;
    color: var(--gray-text);
    background-color: var(--canvas);
  }
  /* Active tab on app start */
  .start-color{
    color: var(--highlight-text);
    background-color: var(--highlight);
  }

  main > section{
    flex-grow: 1;
    position: relative;
    overflow: auto;
  }

  footer{
    padding: 0.25rem 0.5rem;
    font-size: 1.2rem;
    border-top: 1px solid var(--button-border);
  }
</style>
