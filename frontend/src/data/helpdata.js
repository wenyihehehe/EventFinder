let helpData = [
    {
        id: 1,
        title: "How to create an event",
        data: <div><p>Click &quot;Create Event&quot; that is located on the top of the website / Go to event dashboard, click &apos;Create Event&apos; button.</p>
        <p>When creating event, you will need to fill in the following information:</p>
        <ul>
            <li>Event title</li>
            <li>Event cover image</li>
            <li>Event category</li>
            <li>Event detail</li>
            <li>Event images (if any)</li>
            <li>Event type (either physical or online)</li>
            <li>Event location</li>
            <li>Event start date &amp; end date</li>
            <li>Event ticket type</li>
        </ul>
        <p>All these information are required when publishing your event. Do not worry if you are unsure about the exact event details, you can always save it as draft and edit it afterward.</p>
        <p>Note: you will need to create an organizer profile first before creating your first event.</p></div>
    },
    {
        id: 2,
        title: "How to edit your event",
        data: <div><p>To edit your event:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<b>⋮</b> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On the left navigation bar, select &quot;Edit event&quot;.</li>
        </ol></div>
    },
    {
        id: 3,
        title: "How to delete your event",
        data: <div><p>To delete your event:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<b>⋮</b> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Delete&quot;.</li>
        </ol>
        <p>Note: Published/Ended event cannot be deleted. Delete action is not reversible.</p></div>
    },
    {
        id: 4,
        title: "How to share your event",
        data: <div><p>To share your event:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<b>⋮</b> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On the dashboard page, under Links section, you can find your event URL and organizer profile URL.</li>
        </ol>
        <p>Note: Event URL only works for Published/Ended event.</p></div>
    },
    {
        id: 5,
        title: "How to create new ticket type",
        data: <div><p>To create new ticket type:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<b>⋮</b> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>
                On dashboard page, under Tickets section, click &quot;Add tickets&quot; button.
            </li>
            <li>
                Or, select &quot;Edit event&quot; on the left navigation bar, under Tickets section, click &quot;Add tickets&quot; button.
            </li>
        </ol></div>
    },
    {
        id: 6,
        title: "How to edit a ticket type",
        data: <div><p>To edit a ticket type:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On dashboard page, scroll to Tickets section / select &quot;Edit event&quot; on the left navigation bar, scroll to &nbsp;Tickets section.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected ticket type row.</li>
            <li>Click &quot;Edit&quot;.</li>
        </ol></div>
    },
    {
        id: 7,
        title: "How to delete a ticket type",
        data: <div><p>To delete a ticket type:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On dashboard page, scroll to Tickets section / select &quot;Edit event&quot; on the left navigation bar, scroll to &nbsp;Tickets section.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected ticket type row.</li>
            <li>Click &quot;Delete&quot;.</li>
        </ol>
        <p>Note: Only ticket type that has not been sold can be deleted. Delete action is not reversible.</p></div>
    },
    {
        id: 8,
        title: "How to check ticket type availability",
        data: <div><p>To check ticket type availability:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On dashboard page, scroll to Tickets section / select &quot;Edit event&quot; on the left navigation bar, scroll to &nbsp;Tickets section.</li>
            <li>Check ticket type availability under column name &quot;Quantity&quot;.</li>
        </ol></div>
    },
    {
        id: 9,
        title: 'How to mark a ticket type as "sold out"',
        data: <div><p>To mark a ticket type as &quot;sold out&quot;:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>On dashboard page, scroll to Tickets section / select &quot;Edit event&quot; on the left navigation bar, scroll to &nbsp;Tickets section.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected ticket type row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>Change Quantity to 0.</li>
        </ol></div>
    },
    {
        id: 10,
        title: 'How to check registration for your event',
        data: <div><p>To check registration for your event:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>Select &quot;Manage registration&quot; on the left navigation bar to view all registrations.</li>
        </ol></div>
    },
    {
        id: 11,
        title: 'How to mark registrant as "attended"',
        data: <div><p>To mark registrant as "attended":</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>Select &quot;Manage attendee&quot; on the left navigation bar.</li>
            <li>Search the attendees by registrant name/registration order number/name of ticket type.</li>
            <li>Check the box under &quot;Attendance&quot; column.</li>
        </ol></div>
    },
    {
        id: 12,
        title: 'How to check event performance',
        data: <div><p>To check event performance:</p>
        <ol>
            <li>Go to event dashboard.</li>
            <li>Click the &quot;<strong>⋮</strong> &quot; button at the end of the selected event row.</li>
            <li>Click &quot;Edit&quot;.</li>
            <li>Select &quot;Event performance&quot; on the left navigation bar.</li>
            <li>Under the page, you will see the overall performance of your event (page views, tickets sold and revenue), ticket sales of your event and attendance of your event.</li>
        </ol></div>
    },
    {
        id: 13,
        title: "How to search events",
        data: <div><p>To search events:</p>
        <ol>
            <li>Type the event title in the search bar on top of the website.</li>
            <li>Then click the search icon.</li>
            <li>You may filter the search result based on:<ul>
                    <li>Event category</li>
                    <li>Event type</li>
                    <li>Event location</li>
                </ul>
            </li>
        </ol></div>
    },
    {
        id: 14,
        title: "How to register to an event",
        data: <div><p>To register to an event:</p>
        <ol>
            <li>Go to event page.</li>
            <li>Click &quot;Register Now&quot; button.</li>
            <li>Select the ticket type quantity, and click &quot;Register Now&quot; button.</li>
        </ol>
        <p>Note: You will need to login or register an account to create event registration.</p></div>
    },
    {
        id: 15,
        title: "Where to find your tickets",
        data: <div><p>To find your ticket:</p>
        <ol>
            <li>Click &quot;My Tickets&quot; that is on top of the website / Go to user profile page.</li>
            <li>Under &quot;My Registration&quot; section, you will see the list of registrations you have made.</li>
            <li>Click &quot;More Info&quot; for event and order details about your registration.</li>
        </ol></div>
    },
    {
        id: 16,
        title: "How to edit/cancel your registration",
        data: <div><p>Unfortunately, EventFinder does not support editing or cancellation of registration. Kindly contact your event organizer the issue.</p>
        <div>You should find "Contact Organizer" button under ticket detail page.</div></div>
    },
    {
        id: 17,
        title: "How to review registered event",
        data: <div><p>To review registered event:</p>
        <ol>
            <li>Click &quot;My Tickets&quot; that is on top of the website / Go to user profile page.</li>
            <li>Under &quot;My Registration&quot; section, you will see the list of registrations you have made.</li>
            <li>Click &quot;More Info&quot; for event and order details about your registration.</li>
            <li>Scroll to bottom of the page and click &quot;Create Review&quot;.</li>
        </ol>
        <p>Note: You are allowed to submit review once for each registration.</p></div>
    },
    {
        id: 18,
        title: "How to contact the event organizer",
        data: <div><p>To contact the event organizer:</p>
        <ol>
            <li>Click &quot;My Tickets&quot; that is on top of the website / Go to user profile page.</li>
            <li>Under &quot;My Registration&quot; section, you will see the list of registrations you have made.</li>
            <li>Click &quot;More Info&quot; for event and order details about your registration.</li>
            <li>Scroll to bottom of the page and click &quot;Contact Organizer&quot;.</li>
        </ol></div>
    },
    {
        id: 19,
        title: "How to join the event",
        data: <div><p>Regardless of which type the event is, you should be able to get the location information under ticket detail page.</p>
        <p>For physical event, physical address should be provided by the event organizer.</p>
        <p>For online event, the event organizer should provide a link for you to join the event through any online meeting platform.</p></div>
    },
]

export function getHelpData(id) {
    return helpData.find(
      (data) => data.id === id
    );
}