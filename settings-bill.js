module.exports = function settingsBill() {

    var theCallCost;
    var theSmsCost;
    var theWarningLevel;
    var theCriticalLevel;


    var actionList = []

    function setSettings(settings) {
        theSmsCost = Number(settings.smsCost);
        theCallCost = Number(settings.callCost);
        theWarningLevel = settings.warningLevel;
        theCriticalLevel = settings.criticalLevel;

    }

    function getSettings() {
        return {
            theSmsCost,
            theCallCost,
            theWarningLevel,
            theCriticalLevel
        }
    }

    function recordAction(action) {
        if (action) {
            if (!hasReachedCriticalLevel2()) {
                var cost = 0;


                if (action === "sms") {
                    cost = theSmsCost
                }

                else if (action === "call") {
                    cost = theCallCost
                }
                actionList.push({
                    type: action,
                    cost,
                    timeStamp: new Date()
                })


            }

        }


    }

    function actions() {
        return actionList
    }


    function actionsFor(type) {

        return actionList.filter((action) => action.type === type)


    }



    function getTotal(type) {
        return actionList.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0;
            return total + val;
        }, 0);

    }

    function grandTotal() {

        return getTotal('sms') + getTotal('call')


    }

    function totals() {
        let totalSmsCost = getTotal('sms').toFixed(2)
        let totalCallCost = getTotal('call').toFixed(2)

        return {
            totalSmsCost,
            totalCallCost,
            grandTotal: grandTotal().toFixed(2)
        }
    }

    function hasReachedWarningLevel() {
        var total = grandTotal()
        var reachedWarningLevel = total >= theWarningLevel && total < theCriticalLevel

        return reachedWarningLevel

    }


    function hasReachedCriticalLevel2() {
        total = grandTotal();
        return total >= theCriticalLevel


    }

    function totalClassName() {
        if (hasReachedCriticalLevel2()) {
            return "critical";
        }

        if (hasReachedWarningLevel()) {


            return "warning";
        }
    }



    return {
        totalClassName,
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel2

    }



};