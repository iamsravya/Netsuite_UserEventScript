/**
*@NApiVersion 2.x
*@NScriptType UserEventScript
**/


// Before Load 
/** Utilizing beforeLoad event to pre-fill fields and sublist data when a PO is being loaded.
Set default values for the vendor, memo, and item sublist.
**/
define(['N/record'],
function(record){
	function sr_beforeload(context){
		var new_record = context.newRecord;
		new_record.setValue({fieldId: 'entity', value: 564});
		new_record.setValue({fieldId: 'memo', value: 'Sr-po record'});
		
		new_record.setSublistValue({sublistId: 'item', fieldId: 'item', line: 0, value: 34});
		new_record.setSublistValue({sublistId: 'item', fieldId: 'quantity', line: 0, value: 2});
		new_record.setSublistValue({sublistId: 'item', fieldId: 'rate', line: 0, value: 1000});
		
	}
	return{
		beforeLoad: sr_beforeload
	};
})


// Before Submit
/** Employing beforeSubmit event to dynamically fetch vendor email and update the memo field before the PO is submitted.
Fetching vendor email by loading the associated vendor record based on the selected entity.
**/
define(['N/record'],
function(record){
	function sr_beforeSubmit(context){
		var rec = context.newRecord;
		var po_vendor = rec.getValue({fieldId: 'entity'});
		if(po_vendor){
			var loadrec = record.load({type: record.type.vendor, Id: po_vendor, isDynamic: true});
			var vendor_email = loadrec.getValue({fieldId: 'email'});
			rec.setValue({fieldId: 'memo', value: vendor_email});
		}
	}
		return{
			beforeSubmit: sr_beforeSubmit
		};
})


// After Submit	
/**  Executing afterSubmit event to perform actions after the PO is submitted.
Creating a custom record to store PO-related information.
Extracting PO details such as number, vendor name, date, subsidiary, and location.
Populating the custom record with these details for further processing or reporting.
**/	
define(['N/record'],
function(record){
	function srAfterSubmit(context){
		var rec = context.newRecord;
		var record_type = rec.type;
		var record_id = rec.Id;
		var po_record = record.load({type: record_type, id: record_id});
		var po_no = po_record.getValue({fieldId: 'tranid'});
		var vendor_name = po_record.getValue({fieldId: 'entity'});
		var po_date = po_record.getValue({fieldId: 'trandate'});
		var po_subsidiary = po_record.getValue({fieldId: 'subsidiary'});
		var po_location = po_record.getText({fieldId: 'location'});
		var po_info = record.create({type: 'customrecord1958', isDynamic: true});
		po_info.setValue({fieldId: 'custrecord_po_no', value: po_no});
		po_info.setValue({fieldId: 'custrecord_sr_name', value: vendor_name});
		po_info.setValue({fieldId: 'custrecord1', value: po_date});
		po_info.setValue({fieldId: 'custrecord9', value: po_subsidiary});
		po_info.setValue({fieldId: 'custrecord4', value: po_location});
		po_info.save();
	}
		return {
			aftersubmit: srAfterSubmit
		};
})
		
		
