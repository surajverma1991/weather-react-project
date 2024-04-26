exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    const { keyword } = event.queryStringParameters;
    const apiKey = process.env.REACT_APP_API_KEY;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=metric&appid=${apiKey}`
    );

    let data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

// module.exports.handler();
