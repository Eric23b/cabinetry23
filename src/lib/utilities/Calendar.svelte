<script>
	import { onMount } from 'svelte';
    import { isToday, getPreviousSun, getNextSat, formatDateToCA, getCorrectDate } from '../js-utilities/date-utilities'

    export let events = [
        {name: "1.a", date: "2023-05-15"},
        {name: "1.b", date: "2023-05-15"},
        {name: "1.c", date: "2023-05-15"},
        {name: "2.a", date: "2023-05-16"},
        {name: "3.a", date: "2023-05-18"},
    ];

    let weeks = [];

    let calendarContainer;

    let mounted = false;
	onMount(async () => {mounted = true});

    $: {
        if (mounted) {
            buildCalendar();
        }
    }

    buildCalendar();

    function buildCalendar() {
        if (events.length == 0) return;

        sortDown(events, 'date');

        const startDate = getPreviousSun(events[events.length - 1].date);
        startDate.setDate(startDate.getDate() - (7 * 3));
        const endDate = getNextSat(events[0].date);
        endDate.setDate(endDate.getDate() + (7 * 5));
        const dateIndex = new Date(startDate);
        weeks = [];
        let safeLoopCounter = 0;
        do {
            let week = [];
            for (let dayOfTheWeekIndex = 0; dayOfTheWeekIndex < 7; dayOfTheWeekIndex++) {
                const daysEvents = [];
                events.forEach((event) => {
                    if (event.date == formatDateToCA(dateIndex)) {
                        daysEvents.push(event);
                    }
                });

                const before = dateIndex.getDate() == 1 ? dateIndex.toLocaleString('default', {month: 'long'}) : dateIndex.getDate();
                const after = dateIndex.toLocaleString('default', {weekday: 'short'});
                let cssClasses = dateIndex.getDate() == 1 ? 'calendar-day-highlight-before ' : '';
                cssClasses += isToday(formatDateToCA(dateIndex)) ? ' calendar-day-highlight-after calendar-day-underline-after' : '';
                week.push({date: formatDateToCA(dateIndex), before, after, cssClasses, daysEvents});
                dateIndex.setDate(dateIndex.getDate() + 1);
            }
            weeks.push(week);

            if (safeLoopCounter++ > 100000) break;
        } while (formatDateToCA(dateIndex) <= formatDateToCA(endDate));
    }


    function sortDown(array, property) {
        array.sort((a, b) => {
            const nameA = a[property];
            const nameB = b[property];
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        });
    }
</script>

<section bind:this={calendarContainer}>
	{#each weeks as week, i}
        <div>
            {#each week as day, i}
                <div>
                    <div data-date="{day.date}" data-before="{day.before}" data-after="{day.after}" class="{day.cssClasses}"></div>
                    <div class="calendar-day-events-container">
                        {#each day.daysEvents as event, i}
                            <p class="calendar-day-event">{event.name}</p>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
	{/each}
</section>


<style>
    section{
        /* display: flex;
        flex-direction: column;
        width: 100%; */
        border: 1px solid var(--button-border);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        width: 100%;
        inset: 0;
        flex-grow: 1;
        overflow: scroll;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
        scroll-behavior: smooth;
    }
    /* Week */
    section > div{
    /* .week{ */
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: max-content;
        align-items: stretch;
    }
    /* Day */
    section > div > div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        min-height: 8vw;
        /* height: 100%; */
        padding-bottom: 0.5em;
        overflow: hidden;
        border-right: 1px solid var(--button-border);
        border-bottom: 1px solid var(--button-border);
        font-size: clamp(0.25em, 1.5vw, 1.125em);
        transition: background-color .5s;
    }
    /* Day header container */
    section > div > div > div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.25em;
        color: var(--gray-text);
        background-color: transparent;
        pointer-events: none;
    }
    section > div > div > div::before{
        content: attr(data-before);
    }
    section > div > div > div::after{
        content: attr(data-after);
    }

    .calendar-day-highlight-before::before{
        color: var(--accent-color);
    }
    .calendar-day-highlight-after::after{
        color: var(--accent-color);
    }
    .calendar-day-underline-before::before{
        text-decoration: underline;
    }
    .calendar-day-underline-after::after{
        text-decoration: underline;
    }
    .calendar-day-events-container{
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: flex-end;
        align-items: center;
        gap: 2px;
        padding: 0 1px 1px 1px;
        margin: 0 2px 0 2px;
        pointer-events: none;
        background: transparent;
    }
    .calendar-day-event{
        margin: 0;
        padding: 0 0.1em;
        color: var(--canvas-text);
        background: transparent;
        cursor: pointer;
        overflow: visible;
        pointer-events: auto;
        box-sizing: content-box;
        border: solid 1px transparent;
        text-align: center;
    }
    .calendar-day-event:hover{
        color: var(--highlight-text);
        background-color: var(--highlight);
        border: solid 1px var(--button-border);
    }
</style>