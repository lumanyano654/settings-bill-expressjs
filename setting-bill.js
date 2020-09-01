module.exports = function billWithSettings() {

    var theCallCost = 0;
    var theSmsCost = 0;
    var theWarningLevel = 0;
    var theCriticalLevel = 0;

    var totalCallCost = 0;
    var totalSmsCost = 0;

    var actionList = []



    function setCallCost(callCost) {
        theCallCost = callCost;
    }


    function getCallCost() {

        return theCallCost
    }


    function setSmsCost(smsCost) {
        theSmsCost = smsCost;
    }


    function getSmsCost() {

        return theSmsCost
    }


    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function getWarningLevel(warningLevel) {
        return theWarningLevel;


    }

    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    function getCriticalLevel(criticalLevel) {
        return theCriticalLevel;


    }

    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            totalCallCost += theCallCost;
        }

    }

    function getTotalCost() {
        return totalCallCost + totalSmsCost;
    }

    function getTotalCallCost() {
        return totalCallCost;
    }
    function getTotalSmsCost() {
        return totalSmsCost;
    }

    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            return totalSmsCost += theSmsCost;
        }
    }

    function hasReachedCriticalLevel() {
        return getTotalCost() >= getCriticalLevel();
    }


    function totalClassName() {
        if (hasReachedCriticalLevel()) {
            return "critical";
        }

        if (getTotalCost() >= getWarningLevel()) {


            return "warning";
        }
    }




    

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
            timestamp: new Date()
        })
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
        let totalSmsCost = getTotal('sms')
        let totalCallCost = getTotal('call')

        return {
            totalSmsCost,
            totalCallCost,
            grandTotal: grandTotal()
        }
    }

    function hasReachedWarningLevel() {
        var total = grandTotal()
        var reachedWarningLevel = total >= theWarningLevel && total < theCriticalLevel

        return reachedWarningLevel

    }


    function hasReachedCriticalLevel2() {
        total = grandTotal();
        return total >= criticalLevel


    }





    return {

        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
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