<<<<<<< HEAD
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChartPie);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Assets', 'Type'],
    ['Chase',     56],
    ['American Express',      44]
  ]);

  var options = {
    title: 'Credit Card Usage',
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

function drawChartPie() {
  var data = google.visualization.arrayToDataTable([
    ['Spending', 'Categories'],
    ['Restaurants', 6],
    ['Online Purchases',      52],
    ['Grocery',  17],
    ['Gas', 20],
    ['Subscription Services',    5]
  ]);

  var options = {
    title: 'Spending by Categories',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);
}

// Awaiting for backend API to plugin and populate charts 
=======
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChartPie);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Assets', 'Type'],
    ['Chase',     11],
    ['Discover',      2],
    ['Bank of America',  2],
    ['Bitcoin', 2],
    ['Ethereum',    7]
  ]);

  var options = {
    title: 'Credit Card Usage | Currency',
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

function drawChartPie() {
  var data = google.visualization.arrayToDataTable([
    ['Spending', 'Categories'],
    ['Food & Dining', 11],
    ['Fees & Charges',      2],
    ['Bills & Utilities',  2],
    ['Health & Fitness', 2],
    ['Pets',    7],
    ['Auto & Transport',    10],
    ['Business Service',    8],
    ['Uncategoriezed',    5]
  ]);

  var options = {
    title: 'Spending by Categories',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);
}

// Awaiting for backend API to plugin and populate charts 
>>>>>>> b0d8d2e311734cbf57ede61c3263792bf55390bc
// Frontend part can be found in the transaction page in the chart area