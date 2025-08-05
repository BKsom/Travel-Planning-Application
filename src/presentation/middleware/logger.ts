export const requestLogger = {
  async requestDidStart(requestContext: any) {
    console.log(`[GraphQL Request] ${requestContext.request.operationName || 'Unnamed'} started`);
    return {
      async willSendResponse(ctx: any) {
        console.log(`[GraphQL Response] Operation ${ctx.request.operationName || 'Unnamed'} completed`);
      },
    };
  },
};
