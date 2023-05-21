<script>
    import Calendar from './utilities/Calendar.svelte'

</script>

<section>
    <table>
        <tr>
            <th>ID#</th>
            <th>Customer</th>
            <th>Start Date</th>
            <th>Delivery Date</th>
            <th>Install Date</th>
            <th>Paid</th>
            <th>Completed</th>
        </tr>
        <tr>
            <td>1.a</td>
            <td>Aaron</td>
            <td>2023-05-01</td>
            <td>2023-05-10</td>
            <td>2023-05-15</td>
            <td>✓</td>
            <td>✓</td>
        </tr>
        <tr>
            <td>1.b</td>
            <td>Aaron</td>
            <td>2023-05-01</td>
            <td>2023-05-10</td>
            <td>2023-05-15</td>
            <td>✓</td>
            <td>✓</td>
        </tr>
        <tr>
            <td>1.c</td>
            <td>Aaron</td>
            <td>2023-05-01</td>
            <td>2023-05-10</td>
            <td>2023-05-15</td>
            <td>✓</td>
            <td>✓</td>
        </tr>
        <tr>
            <td>2.a</td>
            <td>Bill</td>
            <td>2023-05-10</td>
            <td>2023-05-16</td>
            <td>2023-05-16</td>
            <td>✓</td>
            <td></td>
        </tr>
        <tr>
            <td>3.a</td>
            <td>Carter</td>
            <td>2023-05-16</td>
            <td>2023-05-17</td>
            <td>2023-05-18</td>
            <td>✓</td>
            <td></td>
        </tr>
    </table>
    <Calendar/>
</section>

<style>
    section{
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
    }

    table{
        border: 1px solid var(--button-border);
        border-spacing: 0;
    }
    tr:nth-child(even){
        background-color: var(--button-face);
    }
    tr:hover{
        background-color: var(--highlight);
    }
    tr:first-child{
        background-color: var(--canvas);
        border-bottom: 1px solid var(--button-border);
    }
    th{
        padding: 0.5rem 1rem;
        text-align: center;
        background: transparent;
    }
    td{
        text-align: center;
        background: transparent;
        cursor: pointer;
    }
</style>