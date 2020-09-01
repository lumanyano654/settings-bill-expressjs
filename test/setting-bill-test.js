var assert = require("assert")
var billWithSettings = require("../setting-bill")

describe ('the bill with settings factory function', function(){
    it('should be able to set the call cost', function(){
        
        let settingBill = billWithSettings();
       
        settingBill.setCallCost(1.85);

        assert.equal(1.85, settingBill.getCallCost())
        
        let settingBill2 = billWithSettings();
       
        settingBill2.setCallCost(2.75)


        assert.equal(2.75, settingBill2.getCallCost())
    });


    it('should be able to set the sms cost', function(){
        let settingBill = billWithSettings();
        settingBill.setSmsCost(0.85);

        assert.equal(0.85, settingBill.getSmsCost())
        
        let settingBill2 = billWithSettings();
        settingBill2.setSmsCost(1.75)


        assert.equal(1.75, settingBill2.getSmsCost())
    });


    it('should be able to set the sms and call cost', function(){
        
        let settingBill = billWithSettings();
        
        settingBill.setCallCost(2.75);
        settingBill.setSmsCost(0.85);


        
        assert.equal(2.75, settingBill.getCallCost());
        assert.equal(0.85, settingBill.getSmsCost());

       
        let settingBill2 = billWithSettings();
        
        settingBill2.setCallCost(1.75);
        settingBill2.setSmsCost(0.65);


        assert.equal(0.65, settingBill2.getSmsCost());
        assert.equal(1.75, settingBill2.getCallCost());
        


    });

    it('should be able to set the warning level' , function(){
        
        let settingBill = billWithSettings();
        
        settingBill.setWarningLevel(20);
        
        
        assert.equal(20, settingBill.getWarningLevel());
       
    });
    

    it('should be able to set the Critical level' , function() {
        
        let settingBill = billWithSettings();
        
        settingBill.setCriticalLevel(30);
        
        
        assert.equal(30, settingBill.getCriticalLevel());
       

       

    });

    it('should be able to set the warning and Critical level', function() {
        
        let settingBill = billWithSettings();
        
        settingBill.setWarningLevel(15);
        settingBill.setCriticalLevel(25);
        
        
        assert.equal(15, settingBill.getWarningLevel());
        assert.equal(25, settingBill.getCriticalLevel());

       

    });

    
});

describe('use values', function() {
    it('should be able to use call cost', function() {
        
        let settingBill = billWithSettings();
        settingBill.setCriticalLevel(10)
        settingBill.setCallCost(2.25);
        settingBill.setSmsCost(0.00);

        settingBill.makeCall();
        settingBill.makeCall();
        settingBill.makeCall();

        assert.equal(6.75, settingBill.getTotalCost());
        assert.equal(6.75, settingBill.getTotalCallCost());
        assert.equal(0.00, settingBill.getSmsCost());

    })

    it('should be able to use call cost for 2 call 1.35 each', function() {
        
        let settingBill = billWithSettings();

        settingBill.setCriticalLevel(10);
        settingBill.setCallCost(1.35);
        settingBill.setSmsCost(0.00);

        settingBill.makeCall();
        settingBill.makeCall();

        assert.equal(2.70, settingBill.getTotalCost());
        assert.equal(2.70, settingBill.getTotalCallCost());
        assert.equal(0.00, settingBill.getSmsCost());

    })

    it('should be able to send sms 0.85 each', function() {
        
        let settingBill = billWithSettings();

        settingBill.setCriticalLevel(10)
        settingBill.setCallCost(0.00);
        settingBill.setSmsCost(0.85);

        settingBill.sendSms();
        settingBill.sendSms();

        assert.equal(1.70, settingBill.getTotalCost());
        assert.equal(0.00, settingBill.getTotalCallCost());
        assert.equal(0.85, settingBill.getSmsCost());

    })

    it('should be able to send 2 sms 0.85 and 2 calls at 1.35', function() {
        
        let settingBill = billWithSettings();


        settingBill.setCriticalLevel(10);
        settingBill.setCallCost(1.35);
        settingBill.setSmsCost(0.85);

        settingBill.sendSms();
        settingBill.sendSms();
        settingBill.makeCall();
        settingBill.makeCall();


        assert.equal(4.40, settingBill.getTotalCost());
        assert.equal(2.70, settingBill.getTotalCallCost());
        assert.equal(0.85, settingBill.getSmsCost());

    });


});

describe("warning & critical level", function (){

    it("it should return a class name of 'warning' if warning level is reached", function() {
        
        let settingBill = billWithSettings();

        settingBill.setCallCost(1.35);
        settingBill.setSmsCost(0.85);
        settingBill.setWarningLevel(5);
        settingBill.setCriticalLevel(10);

        settingBill.makeCall();
        settingBill.makeCall();
        settingBill.makeCall();
        settingBill.makeCall();
        


        assert.equal("warning", settingBill.totalClassName());
    
    });

    it("it should return a class name of 'critical' when the critical level has been reached", function() {
        
        let settingBill = billWithSettings();

        settingBill.setCallCost(2.50);
        settingBill.setSmsCost(0.85);
        settingBill.setCriticalLevel(10);
        

        settingBill.makeCall();
        settingBill.makeCall();  
        settingBill.makeCall();
        settingBill.makeCall();
        



        assert.equal("critical", settingBill.totalClassName());
    
    });

    

    it("it should stop the Total cost from increasing when the critical level is reached ", function() {
        
        let settingBill = billWithSettings();

        settingBill.setCallCost(2.50);
        settingBill.setSmsCost(0.85);
        settingBill.setCriticalLevel(10);
        

        settingBill.makeCall();
        settingBill.makeCall();  
        settingBill.makeCall();
        settingBill.makeCall();
        settingBill.makeCall();


        assert.equal("critical", settingBill.totalClassName());
        assert.equal(10, settingBill.getTotalCallCost());
    });


    it("it should allow the total to increase after reaching the critical level & then upping the critical level", function() {
        
        let settingBill = billWithSettings();

        settingBill.setCallCost(2.50);
        settingBill.setSmsCost(0.85);
        settingBill.setCriticalLevel(10);
        

        settingBill.makeCall();
        settingBill.makeCall();  
        settingBill.makeCall();
        settingBill.makeCall();
        settingBill.makeCall();


        assert.equal("critical", settingBill.totalClassName());
        assert.equal(10, settingBill.getTotalCallCost());

        settingBill.setCriticalLevel(20);
        assert.equal("warning", settingBill.totalClassName());
        settingBill.makeCall();
        settingBill.makeCall();

        assert.equal(15, settingBill.getTotalCallCost());

    });
});


