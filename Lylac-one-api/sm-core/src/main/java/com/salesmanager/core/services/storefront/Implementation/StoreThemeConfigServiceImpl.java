package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreThemeConfig;
import com.salesmanager.core.repositories.storefront.StoreThemeConfigRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreThemeConfigService;

@Service
public class StoreThemeConfigServiceImpl extends StorefrontServiceImpl<StoreThemeConfig> implements StoreThemeConfigService {
	@Inject public StoreThemeConfigServiceImpl(StoreThemeConfigRepository repository) { super(repository); }
}
