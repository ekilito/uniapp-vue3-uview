export const getInsuranceTypeOptions = (data) => {
    const total = data.reduce((prev, next) => {
        return (prev += +next.value);
    }, 0);

    const showTotal = `${(+total).toFixed(0)}`.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    return {
        title: {
            x: "40%",
            y: "center",
            text: `{b|总费用}\n{a|${showTotal}}{c|万元}`,
            textAlign: "center",
            textStyle: {
                rich: {
                    a: {
                        fontFamily: "Din-Bold",
                        fontSize: 22,
                        color: "#32383F",
                        lineHeight: 40,
                    },
                    b: {
                        fontSize: 12,
                        color: "#666",
                    },
                    c: {
                        fontSize: 12,
                        color: "#32383F",
                    },
                },
            },
        },
        tooltip: {
            triggerOn: "none",
        },
        legend: {
            type: "scroll",
            orient: "vertical",
            right: 0,
            top: "center",
            icon: "circle",
            itemGap: 20,
            itemHeight: 10,
        },
        series: [{
            type: "pie",
            radius: ["50%", "90%"],
            center: ["40%", "50%"],
            labelLine: {
                show: false,
            },
            label: {
                show: true,
                formatter: "{d}%",
                color: "#fff",
                fontSize: 12,
                fontFamily: "Din",
                position: "inside",
            },
            data: data,
        }, ],
    };
};