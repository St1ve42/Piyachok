'use client'
import { Button, Dropdown, Header, Label} from "@heroui/react";
import {Funnel} from "@gravity-ui/icons";
import {UserReviewSearchByTranslation} from "@/src/enums/review/UserReviewSearchByTranslation";
import useSuperadminReviewFilter from "@/src/components/features/reviews/superadmin-filter/useSuperadminReviewFilter";

const SuperadminReviewFilter = () => {
    const {handleFilterChange, searchByValues, ratings, handleRatingChange} = useSuperadminReviewFilter()
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <Funnel/>
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={handleFilterChange}>
                    <Header>Пошук за: </Header>
                    {searchByValues.map(searchByValue => <Dropdown.Item key={searchByValue} id={searchByValue} textValue={UserReviewSearchByTranslation[searchByValue]}>
                        {UserReviewSearchByTranslation[searchByValue]}
                    </Dropdown.Item>)}
                    <Dropdown.SubmenuTrigger>
                        <Dropdown.Item id="rating" textValue="Рейтинг">
                            <Label>Рейтинг</Label>
                            <Dropdown.SubmenuIndicator />
                        </Dropdown.Item>
                        <Dropdown.Popover>
                            <Dropdown.Menu onAction={handleRatingChange}>
                            {ratings.map(rating => <Dropdown.Item key={rating} id={rating} textValue={rating.toString()}>
                                <Label>{rating}</Label>
                            </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.SubmenuTrigger>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default SuperadminReviewFilter