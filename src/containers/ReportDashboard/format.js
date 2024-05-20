export const searchPlaceholder = value => {
  switch (value) {
    case 'enrolled':
      return 'Search Enrolled Students';
    case 'not-enrolled':
      return 'Search Not-Enrolled Students';
    case 'never-enrolled':
      return 'Search Never-Enrolled Students';
    case 'FINALIST':
      return 'Search Final Year Students';
    case 'CONTINUING STUDENT':
      return 'Search Continuing Students';
    case 'FRESHER':
      return 'Search Freshers';
    default:
      return 'Search Students Doing Retakes After Final Year';
  }
};

export const apexChartState = (labels, series) => {
  return {
    options: {
      chart: {
        type: 'donut'
      },
      title: {
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#5a646d'
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '0%',
            labels: {
              position: 'bottom',
              show: true,
              name: {
                show: true
              },
              value: {
                show: true
              },
              total: {
                show: false
              }
            }
          }
        }
      },
      labels,
      legend: {
        show: false,
        position: 'bottom'
      }
    },
    series
  }
};
