var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');

var SettingsBill = require("./settings-bill")

var moment = require("moment");
moment().fromNow();

var settingsBill = SettingsBill()



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"))


app.get("/", function (req, res) {
    res.render("index", { 
     settings: settingsBill.getSettings(), 
     totals: settingsBill.totals(),
     color: settingsBill.totalClassName()
    });
});

app.post("/settings", function (req, res) {

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    })
    res.redirect('/')
})


app.post("/action", function (req, res) {
    settingsBill.recordAction(req.body.billItemTypeWithSettings)

    res.redirect('/')
})

app.get("/actions", function (req, res) {
   var  actionList = settingsBill.actions()
   for(let key of actionList){
       key.ago = moment(key.timeStamp).fromNow()
   }
   res.render('actions',
        {actions: actionList});
})

app.get("/actions/:actionType", function (req, res) {
    var actionList = settingsBill.actionsFor(req.params.actionType) 
     for(let key of actionList){
         key.ago = moment(key.timeStamp).fromNow()

     }
     res.render('actions',
            {actions: actionList });
    
})

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});



