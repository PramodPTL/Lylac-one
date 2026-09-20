package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StoreDeliveryConfig;

public interface StoreDeliveryConfigRepository extends JpaRepository<StoreDeliveryConfig, Long> {
	StoreDeliveryConfig findByMerchantId(Integer merchantId);
}
