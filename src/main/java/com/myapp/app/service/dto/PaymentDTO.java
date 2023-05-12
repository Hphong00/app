package com.myapp.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.myapp.app.domain.Payment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PaymentDTO implements Serializable {

    private UUID id;

    private UUID userId;

    private String cardNumber;

    private String cardHolderName;

    private Integer cardExpirationMonth;

    private Integer cardExpirationYear;

    private String cardCVV;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public Integer getCardExpirationMonth() {
        return cardExpirationMonth;
    }

    public void setCardExpirationMonth(Integer cardExpirationMonth) {
        this.cardExpirationMonth = cardExpirationMonth;
    }

    public Integer getCardExpirationYear() {
        return cardExpirationYear;
    }

    public void setCardExpirationYear(Integer cardExpirationYear) {
        this.cardExpirationYear = cardExpirationYear;
    }

    public String getCardCVV() {
        return cardCVV;
    }

    public void setCardCVV(String cardCVV) {
        this.cardCVV = cardCVV;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentDTO)) {
            return false;
        }

        PaymentDTO paymentDTO = (PaymentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, paymentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentDTO{" +
            "id='" + getId() + "'" +
            ", userId='" + getUserId() + "'" +
            ", cardNumber='" + getCardNumber() + "'" +
            ", cardHolderName='" + getCardHolderName() + "'" +
            ", cardExpirationMonth=" + getCardExpirationMonth() +
            ", cardExpirationYear=" + getCardExpirationYear() +
            ", cardCVV='" + getCardCVV() + "'" +
            "}";
    }
}
