import carData from './taladrod-cars.min.json';

export const processData = () => {
    let brandData = {};
    let modelData = {};

    carData.Cars.forEach(car => {
        const { MkID, Model, Prc } = car;
        const brand = MkID;  // Assuming MkID is the brand ID, you might have a mapping for this.

        // Convert price string to a number
        const price = parseInt(Prc.replace(/,/g, ''), 10);

        if (!brandData[brand]) {
            brandData[brand] = { count: 0, totalValue: 0 };
        }
        brandData[brand].count += 1;
        brandData[brand].totalValue += price;

        if (!modelData[brand]) {
            modelData[brand] = {};
        }
        if (!modelData[brand][Model]) {
            modelData[brand][Model] = { count: 0 };
        }
        modelData[brand][Model].count += 1;
    });

    const carTableData = Object.keys(brandData).map(brand => ({
        brand,
        count: brandData[brand].count,
        totalValue: brandData[brand].totalValue,
    }));

    const pieChartData = {
        labels: Object.keys(brandData),
        datasets: [
            {
                data: Object.values(brandData).map(brand => brand.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const stackedBarChartData = {
        labels: Object.keys(modelData),
        datasets: Object.keys(modelData).map(brand => ({
            label: brand,
            data: Object.values(modelData[brand]).map(model => model.count),
            backgroundColor: '#36A2EB',
        })),
    };

    return { carTableData, pieChartData, stackedBarChartData };
};
