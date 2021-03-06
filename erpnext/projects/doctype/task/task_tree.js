frappe.provide("frappe.treeview_settings");

frappe.treeview_settings['Task'] = {
	get_tree_nodes: "erpnext.projects.doctype.task.task.get_children",
	add_tree_node: "erpnext.projects.doctype.task.task.add_node",
	filters: [
		{
			fieldname: "project",
			fieldtype:"Link",
			options: "Project",
			label: __("Project"),
		},
		{
			fieldname: "task",
			fieldtype:"Link",
			options: "Task",
			label: __("Task"),
			get_query: function() {
				return {
					filters: [["Task", 'is_group', '=', 1]]
				};
			}
		}
	],
	breadcrumb: "Projects",
	get_tree_root: false,
	root_label: "All Tasks",
	ignore_fields: ["parent_task"],
	onload: function(me) {
		me.make_tree();
	},
	toolbar: [
		{
			label:__("Add Multiple"),
			condition: function(node) {
				return node.expandable;
			},
			click: function(node) {
				var d = new frappe.ui.Dialog({
					'fields': [
						{'fieldname': 'tasks', 'label': 'Tasks', 'fieldtype': 'Text'},
					],
					primary_action: function() {
						d.hide();
						return frappe.call({
							method: "erpnext.projects.doctype.task.task.add_multiple_tasks",
							args: {
								data: d.get_values(),
								parent: node.data.value
							},
							callback: function() { }
						});
					}
				});
				d.show();
			}
		}
	],
	extend_toolbar: true
};