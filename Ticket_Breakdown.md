# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

# Your Breakdown Here

## Ticket 1
### Title:
**Add migration to add external_id column in agents table and model to store facility provided custom id**
### Acceptance Criteria:
- New migration is created for the new column.
- There is a new column in the agents table after the execution of migrations.
- Column has appropriate type to store facility provided custom id.
- Agents model is updated to reflect database change.
### Estimate:
15 minutes
### Implementation Details:
Create a new migration, adding a new column to store facility-provided custom id. Then execute migration to add the new column in the database. Update model as per database updates i.e. adds new attribute.

<br />

## Ticket 2
### Title:
**Write a script to update existing agents to have facility-provided custom id**
### Acceptance Criteria:
- A CLI script is added to add the facility-provided custom id to existing agent records
- CLI script has validations, error handling, and fail-safe logic in place.
- After successful execution of the script, existing agents have facility-provided custom id as attached in the ticket.
### Estimate:
2 hours
### Implementation Details:
Create a new CLI script in the scripts folder. The script will fetch existing agents using the model and will update agents as per id to external_id mapping provided as an attachment in this ticket.

<br />

## Ticket 3
### Title:
**Update agents creation function to store facility provided custom id along with other information**
### Acceptance Criteria:
- Existing agent creation function is updated to receive facility-provided custom id.
- Agent creation works as it was.
- There is a facility-provided custom id in the external_id column of the agents table in the database.
### Estimate:
15 minutes
### Implementation Details:
Update existing agent creation function to receive facility-provided custom id. Update model initiation to include facility-provided custom id in external_id attribute. Save the model and verify that facility provided custom id is added in the external_id column in the database.

<br />

## Ticket 4
### Title:
**Update function `getShiftsByFacility` to include facility-provided custom id in agents metadata**
### Acceptance Criteria:
- Fetch query in getShiftsByFacility function is updated to include external_id attribute in agents metadata.
- Shifts returned by getShiftsByFacility include external_id in agents object in each shift object.
### Estimate:
20 minutes
### Implementation Details:
Update fetch query in getShiftsByFacility function to include external_id attribute in agents metadata. Shifts returned by getShiftsByFacility will include external_id in the agents object in each shift object.

<br />

## Ticket 5
### Title:
**Update function `generateReport` to use facility provided custom id instead of internal agent id when generating the reports**
### Acceptance Criteria:
- Shifts fetched in generateReport function using getShiftsByFacility function include external_id attribute in agents metadata.
- Function generateReport uses a facility-provided custom id instead of an internal agent id when generating the report.
- Resulting report file contains facility-provided custom id instead of internal agent id.
### Estimate:
20 minutes
### Implementation Details:
Update generateReport function that uses getShiftsByFacility function to fetch shifts will now include the external_id attribute in agents metadata. Update generateReport function to use facility provided custom id instead of the internal agent id when generating the report. The report file should contain facility provided custom id instead of an internal agent id.
