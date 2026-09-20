package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StorePaymentConfig;

public interface StorePaymentConfigRepository extends JpaRepository<StorePaymentConfig, Long> {
	StorePaymentConfig findByMerchantId(Integer merchantId);
}
