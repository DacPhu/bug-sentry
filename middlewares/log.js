const logMiddleware = (req, res, next) => {
    const startTime = Date.now();
    
    // Store the original `write` and `end` functions
    const originalWrite = res.write;
    const originalEnd = res.end;
    const chunks = [];
  
    // Override the `write` function to capture response chunks
    res.write = function (chunk, ...args) {
      chunks.push(Buffer.from(chunk));
      originalWrite.apply(res, [chunk, ...args]);
    };
  
    // Override the `end` function to capture the final response chunk
    res.end = function (chunk, ...args) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const responseBody = Buffer.concat(chunks).toString('utf8');
      const elapsedTime = Date.now() - startTime;
      
      const contentType = res.getHeader('Content-Type');
      const shouldLog = !contentType?.includes('text/html') && !req.originalUrl.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|bmp)$/i);
      
      if (shouldLog) {
        // Log the details
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms`);
        console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
        console.log(`Response Body: ${responseBody}`);
      }
      originalEnd.apply(res, [chunk, ...args]);
    };
  
    next();
  };
  
  module.exports = logMiddleware;
  