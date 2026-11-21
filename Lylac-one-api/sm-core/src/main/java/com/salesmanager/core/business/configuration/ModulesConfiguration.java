package com.salesmanager.core.business.configuration;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.salesmanager.core.modules.integration.payment.model.PaymentModule;

/**
 * Contains injection of external shopizer starter modules
 * @author carlsamson
 * New Way - out of xml config and using spring boot starters
 *
 */
@Configuration
public class ModulesConfiguration {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ModulesConfiguration.class);
	
	
    /**
     * All living modules exposed here
     */
    @Autowired
    private List<PaymentModule> liveModules;

    
    
    


}
