'use strict'
// -----------------------------------------------------------------------
//  Whatsspy tracker, developed by Maikel Zweerink
//  filters.js - Filters for the AngularJS application
// -----------------------------------------------------------------------

angular.module('whatsspyFilters', [])
.filter('datetime', function () {
	return function (time) {
		var d = new Date(time);
		var w = moment(d);
		return w.fromNow();
	};
})
.filter('emptyField', function () {
	return function (value) {
		if(value == null || value == undefined || value == '') {
			return '-';
		} else {
			return value;
		}
	};
})
.filter('staticDate', function () {
	return function (time) {
		if(time == null)
			return '-';
		var w = null;
		if(!isNaN(parseFloat(time)) && isFinite(time)) {
			var d = new Date(0);
		d.setUTCSeconds(time);
			var w = moment(d);
		} else {
			var w = moment(time);
		}
		return w.format('DD-MM-YYYY');
	};
})
.filter('staticTime', function () {
	return function (time) {
		if(time == null)
			return '-';
		var w = null;
		if(!isNaN(parseFloat(time)) && isFinite(time)) {
			var d = new Date(0);
			d.setUTCSeconds(time);
			var w = moment(d);
		} else {
			var w = moment(time);
		}
		return w.format('HH:mm:ss');
	};
})
.filter('staticDatetime', function () {
	return function (time) {
		if(time == null)
			return '-';
		var w = null;
		if(!isNaN(parseFloat(time)) && isFinite(time)) {
			var d = new Date(0);
			d.setUTCSeconds(time);
			var w = moment(d);
		} else {
			var w = moment(time);
		}
		return w.format('DD-MM-YYYY HH:mm:ss');
	};
})
.filter('object2Array', function() {
	return function(input) {
		var out = []; 
		for(var i in input){
			out.push(input[i]);
		}
		return out;
	}
})
.filter('weekdayToName', function(translateFilter) {
	return function(weekday) {
		switch (weekday) {
		    case 0:
		        return translateFilter("CONTROLLER_WEEKDAY_Sunday");
		        break;
		    case 1:
		        return translateFilter("CONTROLLER_WEEKDAY_Monday");
		        break;
		    case 2:
		        return translateFilter("CONTROLLER_WEEKDAY_Tuesday");
		        break;
		    case 3:
		        return translateFilter("CONTROLLER_WEEKDAY_Wednesday");
		        break;
		    case 4:
		        return translateFilter("CONTROLLER_WEEKDAY_Thursday");
		        break;
		    case 5:
		        return translateFilter("CONTROLLER_WEEKDAY_Friday");
		        break;
		    case 6:
		        return translateFilter("CONTROLLER_WEEKDAY_Saturday");
		        break;
		}
	}
})
.filter('emptyName', function (translateFilter) {
	return function (value) {
		if(value == null) {
			return translateFilter('CONTROLLER_NONAME');
		} else {
			return value;
		}
	};
})
.filter('emptyToken', function (translateFilter) {
	return function (value) {
		if(value == null) {
			return translateFilter('CONTROLLER_NOTOKEN');
		} else {
			return value;
		}
	};
})
.filter('noGroupFilter', function () {
	return function (groups) {
		if(groups == null) {
			return null;
		}
		var realGroups = [];
		for (var i = groups.length - 1; i >= 0; i--) {
			if(groups[i]['gid'] != null) {
				realGroups.push(groups[i]);
			}
		};
		return realGroups;
	};
})
.filter('privacy', function (translateFilter) {
	return function (value) {
		if(value == false) {
			return '\'' + translateFilter('PRIVACY_STATUS_EVERYONE') + '\'';
		} else {
			return '\'' + translateFilter('PRIVACY_STATUS_CONTACTS_OR_NOBODY') + '\'';
		}
	};
})
.filter('trackerReason', function (translateFilter) {
	return function (value) {
		if(value == null) {
			return translateFilter('CONTROLLER_TRACKER_REASON_NONE');
		} else {
			return value;
		}
	};
})
.filter('enabledText', function () {
	return function (value) {
		if(value == true) {
			return 'enabled';
		} else {
			return 'disabled';
		}
	};
})
.filter('timeFormat', function (translateFilter) {
        return function (seconds) {
            var str = '';
            var remainingSec = seconds;
            if(seconds == null || seconds == undefined) {
              return str;
            } 

            if(remainingSec > 86400) {
              str += Math.floor(remainingSec / 86400) + translateFilter('CONTROLLER_TIME_DAY');
              remainingSec = remainingSec % 86400;
            }

            if(remainingSec > 3600) {
              str += Math.floor(remainingSec / 3600) + translateFilter('CONTROLLER_TIME_HOURS');
              remainingSec = remainingSec % 3600;
            }

            if(remainingSec > 60) {
              str += Math.floor(remainingSec / 60) + translateFilter('CONTROLLER_TIME_MINUTES');
              remainingSec = remainingSec % 60;
            } 

            if(remainingSec > 0) {
              str += remainingSec + translateFilter('CONTROLLER_TIME_SECONDS');
            }

            return str;
        };
    })
.filter('numberFilter', function () {
	return function (contacts, phoneNumber, name, group) {
		if(contacts == undefined) {
			return null;
		}
		return contacts.filter(function(contact) {
			var result = true;
			if(phoneNumber != null) {
				if(contact.id == null) {
					result = false;
				} else if(contact.id.indexOf(phoneNumber) != 0) {
					result = false;
				}
			}
			if(name != null) {
				// Multiple searching terms used
				var searchterms = name.split('|');
				var allowName = false;
				for(var i = 0; i < searchterms.length; i++) {
					if(searchterms[i] != '' &&
						contact.name != null &&
						contact.name.toLowerCase().indexOf(searchterms[i].toLowerCase()) != -1) {
						allowName = true;
					}
				}
				if(searchterms.length == 1 && searchterms[0] == '') {
					// We dont care!?!
					result = true;
				} else {
					result = allowName;
				}
			}
			if(group != null) {
				result = false;
				if(contact.groups.length != 0) {
					for (var i = contact.groups.length - 1; i >= 0; i--) {
						if(contact.groups[i].gid == group) {
							result = true;
						}
					};
				}
			}
			return result;
		});
	};
});