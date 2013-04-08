Ext.ns('AFINCH.ui');
/**
 * @param graphElt - a DOM Node in which to render the Dygraph
 * @param legendElt - a DOM Node in which to render the legend
 * @param values - the array of arrays containing the data to graph
 */
AFINCH.ui.FlowDygraph = function(graphElt, legendElt, values){
    var decileSuffix = "th % (cfs)";
    var decileLabels = ['90','80','70','60','50','40','30','20','10'].map(
        function(prefix){
            return prefix + decileSuffix;
        });
        
    var mainLabelSuffix = " (cfs)";
    var mainLabels = 
    [
    'Monthly Flow',//initial field
    //subsequently-loaded fields:
    'Mean Annual Flow',
    'Median Annual Flow',
    'Mean Monthly Flow',
    'Median Monthly Flow'
    ].map(function(prefix){
        return prefix + mainLabelSuffix;
    });
    //must include x axis label as well:
    var labels = ['Date'].concat(mainLabels).concat(decileLabels);
        
    var canonicalDecileSeriesOptions = {
        strokeWidth: 1,
        stepPlot: false
    };
    var allDecileSeriesOptions ={};
    decileLabels.each(function(label){
        allDecileSeriesOptions[label] = canonicalDecileSeriesOptions;
    });
    var otherSeriesOptions = {
        'Monthly Flow (cfs)':{
            strokeWidth: 3,
            stepPlot: false
        },
        'Mean Annual Flow (cfs)':{
            strokeWidth: 2,
            stepPlot: true
        },
        'Median Annual Flow (cfs)':{
            strokeWidth: 2,
            stepPlot: true
        },
        'Mean Monthly Flow (cfs)': {
            strokeWidth: 2,
            stepPlot: false
        },
        'Median Monthly Flow (cfs)':{
            strokeWidth: 2,
            stepPlot: false
        }
    };
    var allSeriesOptions ={};
    Object.merge(allSeriesOptions, allDecileSeriesOptions);
    Object.merge(allSeriesOptions, otherSeriesOptions);

    var opts = {
        labels: labels,
        colors: ['purple','orange','blue','red','green',
        //deciles:
        'black','black','black','black','black','black','black','black','black'],
        connectSeparatedPoints: true,
        showRangeSelector: true,
        highlightCircleSize: 0,
        labelsDiv: legendElt,
        labelsSeparateLines: true,
        legend: 'always'
    };
        
    Object.merge(opts, allSeriesOptions);
    return new Dygraph(graphElt, values, opts)
};