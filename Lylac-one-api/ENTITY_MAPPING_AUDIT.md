# PostgreSQL entity mapping audit

Scope: Java entity and mapped-superclass declarations across all five Maven modules; generated output excluded. Mappings are inspected statically only. No entity mapping was changed.

## Summary

- No persistent entity field declared directly as `Object`, `Serializable`, `byte[]`, or `Blob` was detected. Serializable DTO/value classes and `serialVersionUID` declarations are not persistent fields.
- No `@Lob` annotation was detected in Java entity sources.
- Explicit Hibernate `TextType` string columns and a custom Locale type require comparison against the actual PostgreSQL schema.
- Expected PostgreSQL types are only inferable from Hibernate mapping intent; existing column types/data cannot be confirmed without a database or migration history.

## Object / serializable / binary field candidates

| Entity file | Field | Java type | Persistence annotations | PostgreSQL risk | Confidence / action |
| --- | --- | --- | --- | --- | --- |
| None found | - | - | - | No candidate entity fields found in scanned model sources. | High confidence for scanned source; check external/XML mappings if any. |

## Explicit Hibernate type overrides

| Entity file | Field | Java type | Annotation line | Existing mapping | Expected PostgreSQL type / risk | Confidence / action |
| --- | --- | --- | ---: | --- | --- | --- |
| `sm-core-model/src/main/java/com/salesmanager/core/model/common/description/Description.java` | `description` | `String` | 53 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/order/Order.java` | `locale` | `Locale` | 135 | `@Type(type="locale")` | Custom Locale type; inspect its Hibernate registration and stored representation before assuming text or serialization. | Low; manual review required. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/order/OrderTotal.java` | `text` | `String` | 48 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/order/orderstatus/OrderStatusHistory.java` | `comments` | `String` | 55 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/payments/Transaction.java` | `details` | `String` | 83 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/system/IntegrationModule.java` | `configDetails` | `String` | 59 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/system/MerchantConfiguration.java` | `value` | `String` | 70 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/system/MerchantLog.java` | `log` | `String` | 51 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |
| `sm-core-model/src/main/java/com/salesmanager/core/model/system/optin/CustomerOptin.java` | `value` | `String` | 76 | `@Type(type = "org.hibernate.type.TextType")` | TextType maps a textual value; PostgreSQL TEXT is expected, but compare live column type/constraints before changes. | Medium; confirm deployed schema. |

## Migration and conversion risks

- Do not convert any column to/from `bytea` without database metadata, sample-value validation, and a reversible migration plan.
- TextType mapping changes can require DDL, alter indexes/length limits, or change application truncation behavior.
- The custom `locale` type?s database representation is not established by these annotations alone.
- No annotation change or database conversion was performed.
