var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');

var SettingsBill = require("./setting-bill")

var settingsBill = SettingsBill()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"))


app.get("/", function (req, res) {
    res.render("index", { 
        settings: settingsBill.getSettings(), 
        totals: settingsBill.totals()
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
    res.render('actions', {actions: settingsBill.actions() })
})

app.get("/actions/:actionType", function (req, res) {
    var actionType = req.params.actionType;
    res.render('actions', {actions: settingsBill.actionsFor(actionType) })  

})

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});



