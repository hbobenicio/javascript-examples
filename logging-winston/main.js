const log = require('./log');

const logger = log.createLogger(__filename);

async function main() {
    await logger;

    logger.info('logger configurado com sucesso', '', {foo: 'foo', bar: 123});
    
    const n = 42;
    
    if (n >= 40) {
        logger.warn('%s já é uma idade avançada. cuide da sua saúde!', n, {n});
    }
    
    logger.debug('programa finalizando com sucesso');
}

main()
    .catch(err => console.error('error:', error));
