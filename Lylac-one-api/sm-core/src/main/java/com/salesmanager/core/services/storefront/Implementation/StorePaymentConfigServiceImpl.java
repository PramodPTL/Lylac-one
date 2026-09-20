package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StorePaymentConfig;
import com.salesmanager.core.repositories.storefront.StorePaymentConfigRepository;
import com.salesmanager.core.services.storefront.Interfaces.StorePaymentConfigService;

@Service
public class StorePaymentConfigServiceImpl extends StorefrontServiceImpl<StorePaymentConfig> implements StorePaymentConfigService {
	@Inject public StorePaymentConfigServiceImpl(StorePaymentConfigRepository repository) { super(repository); }
}
