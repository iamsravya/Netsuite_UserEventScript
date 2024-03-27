# Netsuite_UserEventScript
Automated Purchase Order (PO) related tasks through UserEventScript in Netsuite.
Here is the NetSuite Customization project Leveraging User Event Scripts.

• Streamlined PO creation process with pre-filled data and automated updates.

• Enhanced efficiency by fetching vendor email dynamically.

• Improved data visibility and reporting by capturing PO details in a custom record.

➔ Before Load:

• Utilized beforeLoad event to pre-fill fields and sublist data when a PO is being loaded.

• Set default values for the vendor, memo, and item sublist.

➔ Before Submit:

• Employed beforeSubmit event to dynamically fetch vendor email and update the memo field before the PO is submitted.

• Fetching vendor email by loading the associated vendor record based on the selected entity.

➔ After Submit:

• Executed afterSubmit event to perform actions after the PO is submitted.

• Creating a custom record to store PO-related information.

• Extracting PO details such as number, vendor name, date, subsidiary, and location.

• Populating the custom record with these details for further processing or reporting.


