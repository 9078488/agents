import AWS from '../components/AWS'

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function fectchAllaData(table_name) {
    const data = [];
    const params = {TableName: table_name};
    try {
        let items;
        do {
          items = await dynamodb.scan(params).promise();
          items.Items.forEach((item) => data.push(item));
          params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== "undefined");
      return data;
      } catch (error) {
        console.error('读取数据时出错:', error);
      }
}

export default fectchAllaData;