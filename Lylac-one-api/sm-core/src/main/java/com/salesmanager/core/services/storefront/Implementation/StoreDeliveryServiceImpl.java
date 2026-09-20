package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreDeliveryConfig;
import com.salesmanager.core.repositories.storefront.StoreDeliveryConfigRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreDeliveryService;

@Service
public class StoreDeliveryServiceImpl extends StorefrontServiceImpl<StoreDeliveryConfig> implements StoreDeliveryService {
	@Inject public StoreDeliveryServiceImpl(StoreDeliveryConfigRepository repository) { super(repository); }
}
