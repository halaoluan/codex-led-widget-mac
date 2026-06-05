const { getQuota } = require("../src/main/quota-service");

getQuota()
  .then((quota) => {
    console.log(
      JSON.stringify(
        {
          limitName: quota.limitName,
          planType: quota.planType,
          remainingPercent: quota.remainingPercent,
          primary: quota.primary,
          secondary: quota.secondary,
          fetchedAt: quota.fetchedAt
        },
        null,
        2
      )
    );
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
