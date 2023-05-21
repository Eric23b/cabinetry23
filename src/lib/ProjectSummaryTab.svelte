


<section>
    <!-- Customer -->
    <div class="group-box" data-title="Customer">
        <label class="std-label">Name<input class="std-text-input" type="text"></label>
        <label class="std-label">Email<input class="std-text-input" type="text"></label>
        <label class="std-label">Phone Number<input class="std-text-input" type="text"></label>
        <label class="std-label">Address<textarea class="std-textarea"/></label>
    </div>
    <!-- Dates -->
    <div class="group-box" data-title="Dates">
        <label class="std-label">Start<input class="std-text-input" type="date"></label>
        <label class="std-label">Delivery<input class="std-text-input" type="date"></label>
        <label class="std-label">Install<input class="std-text-input" type="date"></label>
    </div>
    <!-- Materials -->
    <div class="group-box" data-title="Materials">
        <label class="std-label">Wood Type<input class="std-text-input" type="text"></label>
        <label class="std-label">Exterior Finish Type<input class="std-text-input" type="text"></label>
        <label class="std-label">Interior Finish Type<input class="std-text-input" type="text"></label>
        <label class="std-label">Door Style<input class="std-text-input" type="text"></label>
        <label class="std-label">Drawer Front Style<input class="std-text-input" type="text"></label>
        <label class="std-label">Crown Style<input class="std-text-input" type="text"></label>
        <label class="std-label">Countertops<input class="std-text-input" type="text"></label>
    </div>
    <!-- Hardware -->
    <div class="group-box" data-title="Hardware">
        <label class="std-label">Door Pulls<input class="std-text-input" type="text"></label>
        <label class="std-label">Drawer Pulls<input class="std-text-input" type="text"></label>
        <label class="std-label">Drawer Box Type<input class="std-text-input" type="text"></label>
        <label class="std-label">Hinge type<input class="std-text-input" type="text"></label>
    </div>
    <!-- Notes -->
    <div class="group-box" data-title="Notes">
        <label class="std-label">Office<textarea class="std-textarea"/></label>
        <label class="std-label">Shop<textarea class="std-textarea"/></label>
    </div>
</section>

<style>
    section{
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    section .group-box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label .std-textarea{
        height: 5rem;
    }

    div[data-title="Notes"] textarea{
        height: 8rem;
    }
</style>