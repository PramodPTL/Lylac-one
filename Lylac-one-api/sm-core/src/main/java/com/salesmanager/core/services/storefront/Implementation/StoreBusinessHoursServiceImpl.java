package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreBusinessHours;
import com.salesmanager.core.repositories.storefront.StoreBusinessHoursRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreBusinessHoursService;

@Service
public class StoreBusinessHoursServiceImpl extends StorefrontServiceImpl<StoreBusinessHours> implements StoreBusinessHoursService {
	@Inject public StoreBusinessHoursServiceImpl(StoreBusinessHoursRepository repository) { super(repository); }
}
