package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreNavigation;
import com.salesmanager.core.repositories.storefront.StoreNavigationRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreNavigationService;

@Service
public class StoreNavigationServiceImpl extends StorefrontServiceImpl<StoreNavigation> implements StoreNavigationService {
	@Inject public StoreNavigationServiceImpl(StoreNavigationRepository repository) { super(repository); }
}
