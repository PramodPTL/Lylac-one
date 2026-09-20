package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StorePolicy;

public interface StorePolicyRepository extends JpaRepository<StorePolicy, Long> {
	StorePolicy findByMerchantIdAndPolicyType(Integer merchantId, String policyType);
	java.util.List<StorePolicy> findByMerchantIdOrderByPolicyTypeAsc(Integer merchantId);
}
