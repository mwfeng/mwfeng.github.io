var Graduation = echarts.init(document.getElementById('Graduation'), 'chalk');
option = {
    title: {
        text: '2020年就业人口受教育程度',
        left: 'center',
        textStyle: {
            color: '#ffffff'
        }
    },

    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name: '各段受教育百分比',
            type: 'pie',
            radius: [80, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 20
            },

            data: [
                { value: 2.2, name: '未上过学2.2%' },
                { value: 15.7, name: '小学15.7%' },
                { value: 40.6, name: '初中40.6%' },
                { value: 18.7, name: '高中18.7%' },
                { value: 12.0, name: '专科12.0%' },
                { value: 9.7, name: '本科9.7%' },
                { value: 1.1, name: '研究生1.1%' }
            ]
        }
    ]
};
Graduation.setOption(option);

var worktime = echarts.init(document.getElementById('worktime'), 'chalk');
var app = {};
var option1;
var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];
app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};
app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        worktime.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};

option1 = {
    title: {
        text: '各类型工作每周平均工作时间',
        left: 'center',
        textStyle: {
            color: '#ffffff'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        bottom: '1% ',
        left: 'center',
        textStyle: {
            fontSize: 9,//字体大小
            color: '#ffffff'//字体颜色
        },
        data: ['单位负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农林牧渔水利业生产人员', '生产、运输设备操作人员及有关人员', '其他']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },

    },
    xAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: ['2015', '2016', '2017', '2018', '2019'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff'
                }
            }
        }

    ],
    yAxis: [
        {
            name: 'h/周',
            nameTextStyle: {
                color: '#ffffff'
            },

            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff'
                }
            },

        }
    ],
    series: [
        {
            name: '单位负责人',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [46.9, 47.8, 47.5, 47.8, 48.3]
        },
        {
            name: '专业技术人员',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [42.9, 43.4, 43.0, 43.2, 43.5]
        },
        {
            name: '办事人员和有关人员',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [43.1, 43.7, 43.5, 43.6, 44.2]
        },
        {
            name: '商业、服务业人员',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [47.7, 48.4, 48.3, 48.5, 49.1]
        },
        {
            name: '农林牧渔水利业生产人员',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [38.9, 39.4, 39.2, 39.4, 38.7]
        },
        {
            name: '生产、运输设备操作人员及有关人员',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [47.9, 48.5, 48.9, 49.2, 49.8]
        },
        {
            name: '其他',
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            data: [44.6, 50.6, 44.6, 44.9, 47.6]
        }
    ]
};
worktime.setOption(option1);
// var employpop = echarts.init(document.getElementById('employpop'));
var employpop =echarts.init(document.getElementById('employpop'),'chalk')
option2 = {
    title: {
        text: '各行业就业人口数',
        left: 'center',
        textStyle: {
            color: '#ffffff'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: '1% ',
        left: 'right',
        textStyle: {
            fontSize: 9,//字体大小
            color: '#ffffff'//字体颜色
        },
        data: ['国企单位', '集体单位', '其它单位']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },

    },
    xAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: ['农林牧渔业', '采矿业', '制造业', '电力水力等产业', '建筑业', '批发零售业', '交通仓储邮政', '住宿餐饮', '信息技术服务业', '金融业', '房地产业', '租赁和商务服务业', '科学研究和技术服务业', '公共设施管理', '居民、修理服务业', '教育', '卫生和社会工作', '文化体育和娱乐业', '公共管理、社会保障、社会组织'],
            axisLabel: {
                interval: 0,
                rotate: 40,
                show: true,
                textStyle: {
                    color: '#ffffff'
                }
            }
        }
        
    ],
    grid: {
        left: '10%',
        bottom: '25%'
    },
    yAxis: [
        {
            name: '人',
            nameTextStyle: {
                color: '#ffffff'
            },

            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff'
                }
            },

        }
    ],
    series: [
        {
            name: '国企单位',
            type: 'bar',
            stack: '国企单位',
            emphasis: {
                focus: 'series'
            },
            data: [999187, 146673, 385204, 1137575, 803530, 428575, 1318077, 209178, 199251, 893298, 156983, 985341, 1503006, 1298921, 123133, 15399775, 8351081, 821172, 19566708]
        },
        {
            name: '集体单位',
            type: 'bar',
            stack: '国企单位',
            emphasis: {
                focus: 'series'
            },
            data: [31582, 31539, 315225, 32678, 947235, 129141, 84568, 30524, 6871, 94647, 99096, 262394, 43125, 50005, 32326, 377003, 331997, 15442, 40818]
        },
        {
            name: '其它单位',
            type: 'bar',
            stack: '国企单位',
            emphasis: {
                focus: 'series'
            },
            data: [310162, 3498718, 37619875, 2560916, 20954224, 7742759, 6752296, 2412566, 4346456, 7272675, 4846542, 5355927, 2797107, 1095591, 707780, 3316423, 1379220, 675006, 290659]
        }
    ]
};
employpop.setOption(option2);