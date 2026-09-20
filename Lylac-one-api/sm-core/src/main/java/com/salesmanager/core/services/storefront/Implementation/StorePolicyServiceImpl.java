package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StorePolicy;
import com.salesmanager.core.repositories.storefront.StorePolicyRepository;
import com.salesmanager.core.services.storefront.Interfaces.StorePolicyService;

@Service
public class StorePolicyServiceImpl extends StorefrontServiceImpl<StorePolicy> implements StorePolicyService {
	@Inject public StorePolicyServiceImpl(StorePolicyRepository repository) { super(repository); }
}
